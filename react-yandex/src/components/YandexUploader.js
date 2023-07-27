import React, { useState } from 'react';
import axios from 'axios';

const YandexUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const selectedFilesArray = Array.from(files).slice(0, 100); // Ограничение на 100 файлов
    setSelectedFiles(selectedFilesArray);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert('Пожалуйста, выберите файлы для загрузки.');
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);

      for (const [index, file] of selectedFiles.entries()) {
        const path = '/YandexUploader/' + encodeURIComponent(file.name);
        const url = `https://cloud-api.yandex.net/v1/disk/resources/upload?path=${path}&overwrite=true`;

        const response = await axios.get(url, {
          headers: {
            Authorization: 'y0_AgAAAAA7ds0gAApAMQAAAADo0jbvhEi658NoQ6eLcNDWIN6WSkhKzwc',
            'Content-Type': 'application/json',
          },
        });

        const uploadUrl = response.data.href;

        await axios.put(uploadUrl, file, {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          },
        });

        setUploadProgress(0); // Сброс прогресса после загрузки каждого файла
      }

      setUploading(false);

      alert('Файлы успешно загружены!');
    } catch (error) {
      setUploading(false);
      alert('Ошибка при загрузке файлов: ' + error.message);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ backgroundColor: '#007BFF', color: '#FFF', padding: '10px 15px', borderRadius: '4px', border: 'none' }}>
        Загрузить
      </button>
      {uploading && <div>Идет загрузка файлов... {uploadProgress}%</div>}
    </div>
  );
};

export default YandexUploader;