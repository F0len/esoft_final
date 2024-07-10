class FilesController {
    constructor(filesService) {
      this.filesService = filesService;
    }
  
    getAllFiles = async (req, res) => {
      try {
        const files = await this.filesService.getAllFiles();
        res.status(200).json(files);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  
    getFileById = async (req, res) => {
      try {
        const { id } = req.params;
        const file = await this.filesService.getFileById(id);
        if (!file) {
          return res.status(404).json({ error: 'File not found' });
        }
        res.status(200).json(file);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  
    createFile = async (req, res) => {
      try {
        const fileData = req.body;
        const [file] = await this.filesService.createFile(fileData);
        res.status(201).json(file);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  
    updateFile = async (req, res) => {
      try {
        const { id } = req.params;
        const fileData = req.body;
        const [file] = await this.filesService.updateFile(id, fileData);
        if (!file) {
          return res.status(404).json({ error: 'File not found' });
        }
        res.status(200).json(file);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  
    deleteFile = async (req, res) => {
      try {
        const { id } = req.params;
        await this.filesService.deleteFile(id);
        res.sendStatus(204);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  }
  
  module.exports = FilesController;
  