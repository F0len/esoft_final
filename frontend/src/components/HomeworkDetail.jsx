import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, IconButton, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import DOMPurify from 'dompurify';
import { createHomeworkResponses, getHomeworkResponsesById, updateHomeworkResponse, deleteHomeworkResponse } from '../services/api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const HomeworkDetail = ({ selectedItem }) => {
  const [formValues, setFormValues] = useState({});
  const [initialValues, setInitialValues] = useState({});
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
    if (selectedItem.form) {
      const formFields = JSON.parse(selectedItem.form);
      const initialFormValues = formFields.reduce((acc, field) => ({ ...acc, [field.label]: '' }), {});
      setFormValues(initialFormValues);
      setInitialValues(initialFormValues);
    }
    fetchResponses();
  }, [selectedItem]);

  const fetchResponses = async () => {
    try {
      const response = await getHomeworkResponsesById(selectedItem.id);
      setResponses(response.data);
    } catch (error) {
      console.error('Ошибка при извлечении ответов:', error.message);
    }
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const responsePayload = {
      homework_id: selectedItem.id,
      response: formValues,
    };

    try {
      const response = await createHomeworkResponses(responsePayload);
      console.log('Ответ сервера:', response.data);
      setFormValues(initialValues);
      fetchResponses();
    } catch (error) {
      console.error('Ошибка при отправке формы:', error.message);
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
      fetchResponses();
    } catch (error) {
      console.error('Ошибка при редактировании ответа:', error.message);
    }
  };

  const handleDelete = async (responseId) => {
    try {
      await deleteHomeworkResponse(responseId);
      fetchResponses();
    } catch (error) {
      console.error('Ошибка при удалении ответа:', error.message);
    }
  };

  return (
    <Box>
      <Typography variant="h4">{selectedItem.name}</Typography>
      <Typography variant="body1" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedItem.task) }} />
      <Typography variant="button" sx={{ fontWeight: 'bold', color: 'red' }}>
        Дедлайн: {new Date(selectedItem.deadline).toLocaleString()}
      </Typography>
      {selectedItem.form && (
        <Box>
          {JSON.parse(selectedItem.form).map((field, index) => (
            <TextField
              key={index}
              margin="dense"
              name={field.label}
              label={field.label}
              type={field.type}
              fullWidth
              value={formValues[field.label]}
              onChange={handleChange}
              style={{ marginBottom: '16px' }}
            />
          ))}
          <Button onClick={handleSubmit} color="primary">
            Отправить
          </Button>
        </Box>
      )}

      <Box mt={4}>
        <Typography variant="h5">Ваши ответы</Typography>
        {responses.map((response) => (
          <Card key={response.id} sx={{ marginBottom: '16px' }}>
            <CardContent>
              {editingResponseId === response.id ? (
                <Box>
                  <TextField
                    margin="dense"
                    name="comment"
                    label="Comment"
                    type="text"
                    fullWidth
                    value={editedResponse.comment || ''}
                    onChange={handleEditChange}
                    style={{ marginBottom: '16px' }}
                  />
                  <TextField
                    margin="dense"
                    name="grade"
                    label="Grade"
                    type="text"
                    fullWidth
                    value={editedResponse.grade || ''}
                    onChange={handleEditChange}
                    style={{ marginBottom: '16px' }}
                  />
                  <FormControl fullWidth style={{ marginBottom: '16px' }}>
                    <InputLabel>Status</InputLabel>
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
                  {Object.entries(response.response).map(([key, value]) => (
                    <Typography key={key}>
                      <strong>{key}:</strong> {value}
                    </Typography>
                  ))}
                  <Typography>
                    <strong>Comment:</strong> {response.comment || 'N/A'}
                  </Typography>
                  <Typography>
                    <strong>Grade:</strong> {response.grade || 'N/A'}
                  </Typography>
                  <Typography>
                    <strong>Status:</strong> {response.status || 'N/A'}
                  </Typography>
                  <Box mt={2}>
                    <IconButton onClick={() => { setEditingResponseId(response.id); setEditedResponse(response); }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(response.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default HomeworkDetail;
