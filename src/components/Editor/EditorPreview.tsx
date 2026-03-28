import React from 'react';
import 'react-quill-new/dist/quill.snow.css';
import './editor.css';

interface EditorPreviewProps {
  content: string;
  className?: string;
}

const EditorPreview: React.FC<EditorPreviewProps> = ({
  content,
  className = '',
}) => {
  return (
    <div className={`editor-preview-container ${className}`}>
      <div
        className="ql-editor"
        dangerouslySetInnerHTML={{ __html: content }}
        style={{
          border: 'none',
          padding: '1rem',
          minHeight: 'auto',
          backgroundColor: '#f9fafb',
          borderRadius: '0.5rem',
          overflow: 'visible',
        }}
      />
    </div>
  );
};

export default EditorPreview;
