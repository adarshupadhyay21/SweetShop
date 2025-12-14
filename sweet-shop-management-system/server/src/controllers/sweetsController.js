class SweetsController {
    constructor(sweetService) {
        this.sweetService = sweetService;
    }

    async addSweet(req, res) {
        try {
            // require authenticated user
            if (!req.user) return res.status(401).json({ message: 'Authentication required' });
            const sweetData = req.body;
            // attach creator if available
            if (req.user && req.user.id) sweetData.createdBy = req.user.id;
            // basic validation
            if (!sweetData || !sweetData.name || typeof sweetData.name !== 'string' || sweetData.name.trim().length < 2) {
                return res.status(400).json({ message: 'Invalid or missing "name"' });
            }
            if (sweetData.price == null || isNaN(Number(sweetData.price)) || Number(sweetData.price) < 0) {
                return res.status(400).json({ message: 'Invalid or missing "price"' });
            }
            if (!sweetData.category || typeof sweetData.category !== 'string') {
                return res.status(400).json({ message: 'Invalid or missing "category"' });
            }
            if (sweetData.quantity == null || isNaN(Number(sweetData.quantity)) || Number(sweetData.quantity) < 0) {
                return res.status(400).json({ message: 'Invalid or missing "quantity"' });
            }

            const newSweet = await this.sweetService.addSweet(sweetData);
            res.status(201).json(newSweet);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllSweets(req, res) {
        try {
            const page = req.query?.page;
            const limit = req.query?.limit;
            const result = await this.sweetService.getAllSweets({ page, limit });
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getSweetById(req, res) {
        try {
            const { id } = req.params;
            const sweet = await this.sweetService.getSweetById(id);
            if (!sweet) return res.status(404).json({ message: 'Sweet not found' });
            res.status(200).json(sweet);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getCategories(req, res) {
        try {
            const categories = await this.sweetService.getCategories();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async searchSweets(req, res) {
        try {
            // support both path param (/search/:query) and query string (/search?q=...&category=&minPrice=&maxPrice=)
            const pathQuery = req.params?.query;
            const filters = {
                q: req.query?.q || pathQuery || undefined,
                category: req.query?.category,
                minPrice: req.query?.minPrice,
                maxPrice: req.query?.maxPrice
            };
            const sweets = await this.sweetService.searchSweets(filters);
            res.status(200).json(sweets);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateSweet(req, res) {
        try {
            // require authenticated user
            if (!req.user) return res.status(401).json({ message: 'Authentication required' });
            const { id } = req.params;
            const sweetData = req.body;
            // basic validation when provided
            if (sweetData.name && (typeof sweetData.name !== 'string' || sweetData.name.trim().length < 2)) {
                return res.status(400).json({ message: 'Invalid "name"' });
            }
            if (sweetData.price != null && (isNaN(Number(sweetData.price)) || Number(sweetData.price) < 0)) {
                return res.status(400).json({ message: 'Invalid "price"' });
            }
            if (sweetData.quantity != null && (isNaN(Number(sweetData.quantity)) || Number(sweetData.quantity) < 0)) {
                return res.status(400).json({ message: 'Invalid "quantity"' });
            }

            const updatedSweet = await this.sweetService.updateSweet(id, sweetData);
            res.status(200).json(updatedSweet);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async purchaseSweet(req, res) {
        try {
            const { id } = req.params;
            const { quantity } = req.body;
            const updated = await this.sweetService.purchaseSweet(id, Number(quantity || 1));
            res.status(200).json(updated);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async restockSweet(req, res) {
        try {
            // require admin
            if (!req.user || req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Forbidden' });
            }
            const { id } = req.params;
            const { quantity } = req.body;
            const updated = await this.sweetService.restockSweet(id, Number(quantity || 0));
            res.status(200).json(updated);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteSweet(req, res) {
        try {
            // require admin
            if (!req.user || req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
            const { id } = req.params;
            await this.sweetService.deleteSweet(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = SweetsController;

