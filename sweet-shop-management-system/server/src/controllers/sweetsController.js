class SweetsController {
    constructor(sweetService) {
        this.sweetService = sweetService;
    }

    async addSweet(req, res) {
        try {
            const sweetData = req.body;
            const newSweet = await this.sweetService.addSweet(sweetData);
            res.status(201).json(newSweet);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllSweets(req, res) {
        try {
            const sweets = await this.sweetService.getAllSweets();
            res.status(200).json(sweets);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async searchSweets(req, res) {
        try {
            const { query } = req.params;
            const sweets = await this.sweetService.searchSweets(query);
            res.status(200).json(sweets);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateSweet(req, res) {
        try {
            const { id } = req.params;
            const sweetData = req.body;
            const updatedSweet = await this.sweetService.updateSweet(id, sweetData);
            res.status(200).json(updatedSweet);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteSweet(req, res) {
        try {
            const { id } = req.params;
            await this.sweetService.deleteSweet(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = SweetsController;

