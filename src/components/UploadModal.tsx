"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import uniqid from "uniqid";
import { useRouter } from "next/navigation";

import { Modal, Input, Button } from "../components";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";

const UploadModal = () => {
  const [isloading, setIsLoading] = useState(false);
  const { isOpen, close } = useUploadModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onChange = () => {
    if (isOpen) {
      reset();
      close();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const image = values.image?.[0];
      const song = values.song?.[0];

      if (!image || !song || !user) {
        toast.error("Please select a file");
        return;
      }

      const uniqueId = uniqid();

      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueId}`, song, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Error uploading song file");
      }

      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueId}`, image, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error("Error uploading image file");
      }

      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          song_path: songData.path,
          image_path: imageData.path,
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Song uploaded successfully");
      reset();
      close();
    } catch (error) {
      toast.error("Error uploading file");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add a song"
      description="Select an mp3 file to upload"
      isOpen={isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isloading}
          {...register("title", { required: true })}
          placeholder="Song title"
        />

        <Input
          id="author"
          disabled={isloading}
          {...register("author", { required: true })}
          placeholder="Song artist"
        />

        <div>
          <h1 className="pb-1">Select a song</h1>
          <Input
            id="song"
            type="file"
            disabled={isloading}
            accept=".mp3"
            {...register("song", { required: true })}
          />
        </div>

        <div>
          <h1 className="pb-1">Select an image</h1>

          <Input
            id="image"
            type="file"
            disabled={isloading}
            accept="image/*"
            {...register("image", { required: true })}
          />
        </div>

        <Button type="submit" disabled={isloading}>
          Upload
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
