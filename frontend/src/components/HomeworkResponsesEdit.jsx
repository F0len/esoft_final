import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, IconButton, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { getAllHomeworkResponsesById, updateHomeworkResponse } from '../services/api';
import EditIcon from '@mui/icons-material/Edit';

const HomeworkResponsesEdit = ({ homeworkId, onBack }) => {
  const [responses, setResponses] = useState([]);
  const [editingResponseId, setEditingResponseId] = useState(null);
  const [editedResponse, setEditedResponse] = useState({});

  const statusOptions = [
    'Отправлено',
    'Взято в проверку',
    'Отправлено на доработку',
    'Проверено и зачтено',
  ];

  useEffect(() => {
    fetchAllResponses();
  }, []);

  const fetchAllResponses = async () => {
    try {
      const response = await getAllHomeworkResponsesById(homeworkId);
      setResponses(response.data);
    } catch (error) {
      console.error('Ошибка при извлечении ответов:', error.message);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedResponse({ ...editedResponse, [name]: value });
  };

  const handleEditSubmit = async (responseId) => {
    const updatePayload = {
      comment: editedResponse.comment,
      grade: editedResponse.grade,
      status: editedResponse.status,
    };
    try {
      const response = await updateHomeworkResponse(responseId, updatePayload);
      console.log('Ответ сервера:', response.data);
      setEditingResponseId(null);
      fetchAllResponses();
    } catch (error) {
      console.error('Ошибка при редактировании ответа:', error.message);
    }
  };

  return (
    <Box>
      <Typography variant="h5">Редактирование ответов</Typography>
      <Button onClick={onBack} color="secondary" variant="contained">
        Назад
      </Button>
      {responses.map((response) => (
        <Card key={response.id} sx={{ marginBottom: '16px' }}>
          <CardContent>
            {editingResponseId === response.id ? (
              <Box>
                <TextField
                  margin="dense"
                  name="comment"
                  label="Комментарий"
                  type="text"
                  fullWidth
                  value={editedResponse.comment || ''}
                  onChange={handleEditChange}
                  style={{ marginBottom: '16px' }}
                />
                <TextField
                  margin="dense"
                  name="grade"
                  label="Оценка"
                  type="number"
                  fullWidth
                  value={editedResponse.grade || ''}
                  onChange={handleEditChange}
                  style={{ marginBottom: '16px' }}
                />
                <FormControl fullWidth style={{ marginBottom: '16px' }}>
                  <InputLabel>Статус</InputLabel>
                  <Select
                    name="status"
                    value={editedResponse.status || ''}
                    onChange={handleEditChange}
                    label="Status"
                  >
                    {statusOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button onClick={() => handleEditSubmit(response.id)} color="primary">
                  Сохранить
                </Button>
              </Box>
            ) : (
              <Box>
                <Typography>
                  <strong>Пользователь:</strong> {response.name || 'N/A'}
                </Typography>
                <Typography>
                  <strong>Телеграмм:</strong> {response.telegram || 'N/A'}
                </Typography>
                {Object.entries(response.response).map(([key, value]) => (
                  <Typography key={key}>
                    <strong>{key}:</strong> {value}
                  </Typography>
                ))}
                <Typography>
                  <strong>Комментарий:</strong> {response.comment || 'N/A'}
                </Typography>
                <Typography>
                  <strong>Оценка:</strong> {response.grade || 'N/A'}
                </Typography>
                <Typography>
                  <strong>Статус:</strong> {response.status || 'N/A'}
                </Typography>
                <Box mt={2}>
                  <IconButton onClick={() => { setEditingResponseId(response.id); setEditedResponse(response); }}>
                    <EditIcon />
                  </IconButton>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
      
    </Box>
  );
};

export default HomeworkResponsesEdit;
