'use client'
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export default function PromptForm({
  initialPrompt,
  setPrompt,
  prompt
}) {

  // useEffect(() => {
  //   setPrompt(initialPrompt);
  // }, [initialPrompt]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="animate-in fade-in duration-700">
      <div className="flex mt-2">
        <Textarea
          id="prompt-input"
          type="text"
          name="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to create..."
          className="block w-full flex-grow rounded-l-md mt-1"
        />
      </div>
    </form>
  );
}
