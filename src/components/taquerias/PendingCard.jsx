// Tarjeta simple para una taquería por confirmar: solo el texto "Próximamente".
export default function PendingCard() {
  return (
    <article className="pending-card reveal" aria-label="Taquería próximamente">
      <p>Próximamente</p>
    </article>
  );
}
