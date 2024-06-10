import { useState } from 'react';
import styles from './App.module.css';
import logo from './assets/logo.png'
import leftArrowImage from './assets/leftarrow.png';
import { GridItem } from './components/gridItem';
import { levels, calculateImc, Level } from './helpers/imc';

const App = () => {
    const [heightField, setHeightField] = useState('');
    const [weightField, setWeightField] = useState('');
    const [gender, setGender] = useState('male');
    const [toShow, setToShow] = useState<Level | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleCalculateImcButton = () => {
        if (heightField && weightField) {
            const height = parseFloat(heightField);
            const weight = parseFloat(weightField);

            if (height > 0 && weight > 20) {
                const result = calculateImc(height, weight);
                setToShow(result);
                setErrorMessage('');
                setSuccessMessage('Cálculo de IMC realizado com sucesso!');
            } else {
                setErrorMessage('Por favor, insira valores válidos para altura e peso.');
                setSuccessMessage('');
            }
        } else {
            setErrorMessage('Digite todos os campos!');
            setSuccessMessage('');
        }
    };

    const handleBackButton = () => {
        setToShow(null);
        setSuccessMessage('');
        setErrorMessage('');
    };

    return (
        
        <div className={styles.main}>
            <header>
                <div className={styles.headerContainer}>
                    <img src={logo} alt="Logo" width={150} />
                </div>
            </header>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <h1>Calculadora de IMC</h1>
                    {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
                    {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
                    <input
                        type="number"
                        placeholder="Altura (m)"
                        value={heightField}
                        onChange={e => setHeightField(e.target.value)}
                        disabled={!!toShow}
                    />
                    <input
                        type="number"
                        placeholder="Peso (kg)"
                        value={weightField}
                        onChange={e => setWeightField(e.target.value)}
                        disabled={!!toShow}
                    />
                    <select
                        className={styles.select}
                        value={gender}
                        onChange={e => setGender(e.target.value)}
                        disabled={!!toShow}
                    >
                        <option value="male">Masculino</option>
                        <option value="female">Feminino</option>
                    </select>
                    <button onClick={handleCalculateImcButton} disabled={!!toShow}>Calcular IMC</button>
                </div>
                <div className={styles.rightSide}>
                    {!toShow &&
                        <div className={styles.grid}>
                            {levels.map((item, key) => (
                                <GridItem key={key} item={item} />
                            ))}
                        </div>
                    }
                    {toShow &&
                        <div className={styles.rightBig}>
                            <div className={styles.rightArrow} onClick={handleBackButton}>
                                <img src={leftArrowImage} alt="" width={25} />
                            </div>
                            <GridItem item={toShow} />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default App;