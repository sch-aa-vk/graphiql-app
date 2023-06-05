function LoadingIcon() {
  return (
    <svg
      className="loading-icon"
      width={50}
      height={50}
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      viewBox="0 0 512 512"
    >
      <path
        d="M232 0h48v160h-48z"
        style={{
          fill: 'rgba(67, 89, 43, 1)',
        }}
      />
      <path
        d="M51.553 107.545h159.998v48H51.553z"
        style={{
          fill: 'rgba(67, 89, 43, 0.9)',
        }}
        transform="rotate(-134.999 131.552 131.546)"
      />
      <path
        d="M0 232h160v48H0z"
        style={{
          fill: 'rgba(67, 89, 43, 0.8)',
        }}
      />
      <path
        d="M107.558 300.449h48v159.998h-48z"
        style={{
          fill: 'rgba(67, 89, 43, 0.7)',
        }}
        transform="rotate(-134.999 131.558 380.45)"
      />
      <path
        d="M232 352h48v160h-48z"
        style={{
          fill: 'rgba(67, 89, 43, 0.6)',
        }}
      />
      <path
        d="M300.449 356.446h159.998v48H300.449z"
        style={{
          fill: 'rgba(67, 89, 43, 0.5)',
        }}
        transform="rotate(-134.999 380.449 380.448)"
      />
      <path
        d="M352 232h160v48H352z"
        style={{
          fill: 'rgba(67, 89, 43, 0.4)',
        }}
      />
      <path
        d="M356.443 51.54h48v159.998h-48z"
        style={{
          fill: 'rgba(67, 89, 43, 0.3)',
        }}
        transform="rotate(-134.999 380.444 131.54)"
      />
    </svg>
  );
}

export default LoadingIcon;
