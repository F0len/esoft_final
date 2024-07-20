import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, IconButton } from '@mui/material';
import DOMPurify from 'dompurify';
import { createHomeworkResponses, getHomeworkResponsesById, deleteHomeworkResponse } from '../services/api';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const HomeworkDetail = ({ selectedItem, onEditResponses, roles }) => {
  const [formValues, setFormValues] = useState({});
  const [initialValues, setInitialValues] = useState({});
  const [responses, setResponses] = useState([]);

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
      <Typography variant="button" sx={{ fontWeight: 'bold', color: 'info.main', display: 'block' }}>
        Доступно с: {new Date(selectedItem.scheduled_date).toLocaleString()}
      </Typography>
      <Typography variant="button" sx={{ fontWeight: 'bold', color: 'red', display: 'block' }}>
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
        {responses.length!=0 &&
        <>
        <Typography variant="h5">Ваши ответы</Typography>
        {responses.map((response) => (
          <Card key={response.id} sx={{ marginBottom: '16px' }}>
            <CardContent>
              <Box>
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
                  <IconButton onClick={() => handleDelete(response.id)}>
                    <DeleteIcon color='error' />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
        </>
        }
        {['teacher', 'admin'].some(role => roles.includes(role)) &&
          <Button onClick={onEditResponses} color="secondary" variant="contained">
            Посмотреть ответы
          </Button>
        }

      </Box>
    </Box>
  );
};

export default HomeworkDetail;
