'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client"; // Cambia el nombre de la función

export default function Home() {
  const [questions, setQuestions] = useState<{ id: number; question_text: string }[]>([]); // Definir el tipo de preguntas
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [name, setName] = useState(''); // Estado para el nombre
  const [email, setEmail] = useState(''); // Estado para el email
  const [gender, setGender] = useState(''); // Estado para el género
  const [userInfoSaved, setUserInfoSaved] = useState(false); // Estado para verificar si la información del usuario se ha guardado

  useEffect(() => {
    const fetchQuestions = async () => {
      const supabase = createClient(); // Usa la función del lado del servidor
      const { data } = await supabase.from('questions').select('*');
      setQuestions(data || []); // Asignar un arreglo vacío si data es null
    };
    fetchQuestions();
  }, []);

  const handleRatingSubmit = async () => {
    if (!userInfoSaved) {
      // Validar que todos los campos de usuario estén completos
      if (!name || !email || !gender) {
        alert("Por favor, completa todos los campos obligatorios.");
        return;
      }
      // Guardar la información del usuario
      setUserInfoSaved(true);
    } else {
      // Validar que se haya seleccionado una calificación
      if (rating === 0) {
        alert("Por favor, selecciona una calificación.");
        return;
      }
    }

    const supabase = createClient();
    await supabase.from('responses').insert([
      { 
        question_id: questions[currentQuestionIndex].id, 
        user_email: email, // Guardar el email
        rating,
        name, // Guardar el nombre
        gender // Guardar el género
      }
    ]);
    setRating(0);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {!userInfoSaved ? ( // Preguntar nombre, género y email primero
          <div className={styles.userInfo}>
            <input 
              type="text" 
              placeholder="Nombre" 
              value={name} 
              onChange={(e) => setName(e.target.value)} // Manejar cambio de nombre
              className={styles.input}
              required
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} // Manejar cambio de email
              className={styles.input}
              required
            />
            <select 
              value={gender} 
              onChange={(e) => setGender(e.target.value)} // Manejar cambio de género
              className={styles.select}
              required
            >
              <option value="">Selecciona género</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>
            <button onClick={handleRatingSubmit} className={styles.button}>Continuar</button> {/* Cambiar a "Continuar" */}
          </div>
        ) : (
          questions.length > 0 && currentQuestionIndex < questions.length ? (
            <div className={styles.questionContainer}>
              <h2 className={styles.questionText}>{questions[currentQuestionIndex].question_text}</h2>
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((num) => (
                  <span 
                    key={num} 
                    className={`${styles.star} ${rating >= num ? styles.filled : ''}`} 
                    onClick={() => setRating(num)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <button onClick={handleRatingSubmit} className={styles.button}>Enviar respuesta</button>
            </div>
          ) : (
            <p>Gracias por participar en la encuesta.</p>
          )
        )}
      </div>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <Image src="/logo1.png" alt="Logo 1" width={50} height={50} />
          <Image src="/logo2.png" alt="Logo 2" width={50} height={50} />
          <p>Texto en el centro del footer</p>
        </div>
      </footer>
    </main>
  );
}
