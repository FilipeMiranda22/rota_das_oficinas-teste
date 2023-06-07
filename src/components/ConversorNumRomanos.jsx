import React, { useState } from "react";

function ConversorNumRomanos() {
    
    const [inputValue, setInputValue] = useState('');
    const [conversionResult, setConversionResult] = useState();

    const romanNumerals = {
        I: 1,
        IV: 4,
        V: 5,
        IX: 9,
        X: 10,
        XL: 40,
        L: 50,
        XC: 90,
        C: 100,
        CD: 400,
        D: 500,
        CM: 900,
        M: 1000,
    };

    const isValidRomanNumeral = (input) => {
        const romanNumeralPattern = /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
        return romanNumeralPattern.test(input.toUpperCase());
    };

    const handleInputChange = (e) => {  
        setInputValue(e.target.value);
      };
    
    const convertToArabic = () => {

        let arabicNumber = 0;
        let romanInput = inputValue.toUpperCase();

        while (romanInput.length > 0) {
            if (romanNumerals.hasOwnProperty(romanInput.slice(0, 2))) {
            arabicNumber += romanNumerals[romanInput.slice(0, 2)];
            romanInput = romanInput.slice(2);
            } else {
            arabicNumber += romanNumerals[romanInput.slice(0, 1)];
            romanInput = romanInput.slice(1);
            }
        }

        setConversionResult(arabicNumber.toString());
    };

    const convertToRoman = () => {
        let arabicNumber = parseInt(inputValue, 10);
        const numerals = [
            { value: 1000, numeral: 'M' },
            { value: 900, numeral: 'CM' },
            { value: 500, numeral: 'D' },
            { value: 400, numeral: 'CD' },
            { value: 100, numeral: 'C' },
            { value: 90, numeral: 'XC' },
            { value: 50, numeral: 'L' },
            { value: 40, numeral: 'XL' },
            { value: 10, numeral: 'X' },
            { value: 9, numeral: 'IX' },
            { value: 5, numeral: 'V' },
            { value: 4, numeral: 'IV' },
            { value: 1, numeral: 'I' },
        ];

        let romanNumber = '';

        for (let i = 0; i < numerals.length; i++) {
            while (arabicNumber >= numerals[i].value) {
            romanNumber += numerals[i].numeral;
            arabicNumber -= numerals[i].value;
            }
        }

        setConversionResult(romanNumber);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (isValidRomanNumeral(inputValue)) {
            convertToArabic();
        } else if (/^\d+$/.test(inputValue)) {
          const arabicNumber = parseInt(inputValue, 10);
          if (arabicNumber >= 1 && arabicNumber <= 3999) {
            convertToRoman();
          } else {
            setConversionResult('Entrada inválida. Por favor, forneça um número entre 1 e 3999.');
          }
        } else {
          setConversionResult('Entrada inválida. Por favor, forneça apenas números arábicos ou números romanos.');
        }
      };

    return (
        <div className="d-flex justify-content-center align-items-center bg-dark mt-5">
            <div className="card shadow" style={{ width: '23rem', height: "22rem"}}>
                <div className="card-body mt-2 mx-2">
                    <h5 className="card-title text-center">CONVERSOR</h5>
                    <form className="d-flex flex-column">
                        <div class="form-group text-start py-3">
                            <label htmlFor="numero" className="py-2">Número (Arábico ou Romano)</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="numero" 
                                placeholder="Entre com um número entre 1 a 3999" 
                                onChange={handleInputChange} 
                                pattern="[1-9]|[1-9][0-9]{1,3}|[1-3][0-9]{3}"
                            />                           
                        </div>
                        <div class="form-group  py-2">
                            <label htmlFor="resposta" className="py-2 text-start">Resposta:</label>
                            <div className="text-center" style={{ minHeight: '4rem', fontSize: '16px'}}>{conversionResult}</div>
                        </div>
                        <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Converter</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ConversorNumRomanos;
