// ... (Mantieni il codice delle particelle e del cursore che hai inviato) ...

document.addEventListener('DOMContentLoaded', () => {
  console.log("Sistema Avviato...");

  // Forza l'attivazione immediata degli elementi in vista
  const revealElements = () => {
    const triggerBottom = window.innerHeight * 0.9;
    document.querySelectorAll('.fade-in').forEach(el => {
      const tagTop = el.getBoundingClientRect().top;
      if (tagTop < triggerBottom) {
        el.classList.add('visible');
      }
    });
  };

  window.addEventListener('scroll', revealElements);
  revealElements(); // Esegui subito al caricamento
  
  // Avvia il typing del codice
  if(typeof typeCode === 'function') typeCode();
});
