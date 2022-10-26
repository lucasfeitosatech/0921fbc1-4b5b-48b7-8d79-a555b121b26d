import React, { useState } from 'react';

import { InputField, Button } from 'shared/components';
import { MoviesAction } from 'types';

interface AddMovieFormProps {
  onSubmit: (data: Record< "imageUrl" | "title" | "subtitle" | "description", string>) => void,
  onCancel: () => void,
}

export function AddMovieForm({ onSubmit, onCancel }: AddMovieFormProps) {
  // TODO: Implement form for adding a movie
  const [url,setUrl] = useState('');
  const [title,setTitle] = useState('');
  const [subtitle,setSubtitle] = useState('');
  const [description,setDescription] = useState('');

  return (
    <form className="p-4 ">
      {/* TODO: Add code to make form actions work */}
      <InputField setter={v => setUrl(v) } name="Url"/>
      <InputField setter={v =>  setTitle(v)} name="Title"/>
      <InputField setter={v =>  setSubtitle(v)} name="Subtitle"/>
      <InputField setter={v =>  setDescription(v)} name="Description"/>
      <div className="text-center">
      <Button onClick={() => {
        onSubmit({
          imageUrl:url,
          title,
          subtitle,
          description
        });
      }}>
        Submit
      </Button>
      <Button onClick={onCancel}>
        Cancel
      </Button>
      </div>
    </form>
  );
}
