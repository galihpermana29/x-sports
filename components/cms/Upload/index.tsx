import React, { useEffect, useState } from 'react';
import { Upload, Button, FormInstance } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Image from 'next/image';
import axios from 'axios';
import { getBearerToken } from '@/api/token';
import { API_URL } from '@/api';

interface ImageUploadI {
  form: FormInstance<any>;
  name: string;
}

const ImageUpload = ({ form, name }: ImageUploadI) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageUpload = async (options: any) => {
    const { file, onSuccess, onError } = options;
    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await axios.post<{ data: string }>(
        API_URL + '/upload',
        formData,
        {
          headers: {
            Authorization: `Bearer ${getBearerToken()}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (data) {
        setImageUrl(data.data);
        form.setFieldsValue({ [name]: data.data });
        onSuccess();
      } else {
        onError('Upload failed');
      }
    } catch (error) {
      console.log(error, 'error');
      onError('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setImageUrl(null);
  };

  useEffect(() => {
    const initial = form.getFieldValue(name) ?? null;

    console.log(initial, 'init image');
    setImageUrl(initial);
  }, [name, form]);

  return (
    <div className="flex flex-col items-start">
      <Upload
        customRequest={handleImageUpload}
        showUploadList={false}
        accept="image/*">
        {imageUrl ? (
          <div className="h-[200px] w-full max-w-[300px]">
            <Image
              loader={() => imageUrl}
              src={imageUrl}
              alt="Uploaded"
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <Button loading={loading} icon={<UploadOutlined />}>
            Upload Image
          </Button>
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
