import React, { forwardRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';

Quill.register('modules/imageResize', ImageResize);

const ReactQuillComponent = ({ name, control, validate, errorMessage }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={validate}
      render={({ field: { onChange, onBlur, value } }) => {
        return (
          <>
            <ReactQuill
              theme="snow"
              value={value}
              className="bg-white"
              onChange={onChange}
              formats={[
                'header',
                'bold', 'italic', 'underline', 'strike', 'blockquote',
                'list', 'bullet', 'indent',
                'link', 'image'
              ]}
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{ 'list': 'ordered' }, { 'list': 'bullet' },
                  { 'indent': '-1' }, { 'indent': '+1' }],
                  ['link', 'image'],
                  ['clean']
                ],
                clipboard: {
                  // toggle to add extra line breaks when pasting HTML:
                  matchVisual: false,
                },
                imageResize: {
                  parchment: Quill.import('parchment'),
                  modules: ['Resize', 'DisplaySize']
                }
              }}
            />
            {
              errorMessage ? (
                <div className="mt-2 text-danger text-sm">
                  {errorMessage}
                </div>
              ) : null
            }
          </>
        )
      }}
    />
  );
}

ReactQuillComponent.displayName = "ReactQuillComponent"

export default ReactQuillComponent