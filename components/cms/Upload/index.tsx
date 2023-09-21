import React, { useState } from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Image from 'next/image';

// Define the API endpoint to upload images
const uploadApiUrl = 'https://api.x-sports.site/api/v1/upload';

const ImageUpload: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Function to handle image upload
  const handleImageUpload = async (options: any) => {
    const { file, onSuccess, onError } = options;
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Send a POST request to the API to upload the image
      const response = await fetch(uploadApiUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const { imageUrl } = data;

        setImageUrl(imageUrl); // Set the uploaded image URL
        onSuccess();
      } else {
        onError('Upload failed');
      }
    } catch (error) {
      onError('Upload failed');
    }
  };

  // Function to handle file removal
  const handleRemove = () => {
    setImageUrl(null);
  };

  return (
    <div>
      <Upload
        customRequest={handleImageUpload}
        showUploadList={false}
        accept="image/*">
        {imageUrl ? (
          <Image src={imageUrl} alt="Uploaded" style={{ maxWidth: '100px' }} />
        ) : (
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        )}
      </Upload>
      {imageUrl && (
        <Button danger onClick={handleRemove}>
          Remove
        </Button>
      )}
    </div>
  );
};

export default ImageUpload;
