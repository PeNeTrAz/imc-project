const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const levels = [{ name: 'Abaixo do Peso', min: 0, max: 18.5 }, { name: 'Normal', min: 18.5, max: 24.9 }, { name: 'Sobrepeso', min: 25, max: 29.9 }, { name: 'Obesidade', min: 30, max: 34.9 }];

app.get('/imc-levels', (req, res) => {
    res.json(levels);
});

app.post('/calculate-imc', (req, res) => {
    const { height, weight } = req.body;

    if (!height || !weight) {
        return res.status(400).json({ error: 'Altura e peso são necessários.' });
    }

    const heightInMeters = parseFloat(height);
    const weightInKg = parseFloat(weight);

    if (isNaN(heightInMeters) || isNaN(weightInKg) || heightInMeters <= 0 || weightInKg <= 0) {
        return res.status(400).json({ error: 'Altura e peso devem ser valores numéricos positivos.' });
    }

    const bmi = weightInKg / (heightInMeters * heightInMeters);
    const result = {
        bmi: bmi.toFixed(2),
        level: getLevel(bmi)
    };

    res.json(result);
});

function getLevel(bmi) {
    for (const level of levels) {
        if (bmi >= level.min && bmi < level.max) {
            return level.name;
        }
    }
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});