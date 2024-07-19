import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Button,Card, CardContent  } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ReactPlayer from 'react-player';
import DOMPurify from 'dompurify';

const LessonDetail = ({ selectedItem }) => {
  const apiUrl = "http://127.0.0.1:3000/api/files/download/"
  console.log(selectedItem);
  return (
    <Box>
      <Typography variant="h4">{selectedItem.name}</Typography>
      <Typography variant="body1" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedItem.description) }} />
      <Typography
        variant="button"
        sx={{
          fontWeight: 'bold',
          color: 'info.main',

        }}
      >Время начала: {new Date(selectedItem.scheduled_date).toLocaleString()}</Typography>

      <Typography variant="h6">Запись лекции:</Typography>
      <Box sx={{ width: '100%', height: '500px', border: '1px solid black', marginBottom: '16px' }}>
        <ReactPlayer
          url={`${apiUrl}${selectedItem.video.file_path}`}
          width="100%"
          height="100%"
          controls
        />
      </Box>

      <Typography variant="h6">Прикреплённые файлы:</Typography>
      <Box>
      {selectedItem.additionalFiles && selectedItem.additionalFiles.map((file, index) => (
        <Card key={index} sx={{ marginBottom: '16px', backgroundColor: '#f5f5f5' }}>
          <CardContent sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            p: '16px',
            '&:last-child': {
              paddingBottom: "16px"
            }
          }}>
            <Typography variant="h6">{file.name}</Typography>
            <Button 
              variant="outlined" 
              startIcon={<DownloadIcon />}
              onClick={() => window.location.href = `${apiUrl}${file.file_path}`}
            >
              Скачать
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
    </Box>
  );
};


export default LessonDetail;
