import styles from "./truck.module.css";

export default function Truck({
  loadWidth,
  fillColor,
}: {
  loadWidth: number;
  fillColor: string;
}) {
  const boxWidth = 467;
  return (
    <div>
      <svg
        id="Layer_2"
        data-name="Layer 2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 638 316"
        className={styles.truck}
      >
        <g id="Truck">
          <g id="Dynamic_part" data-name="Dynamic part">
            <rect
              id="cargo-box"
              className={styles.cargoBox}
              x="171"
              width={boxWidth}
              height="222"
            />
            <rect
              id="cargo"
              className={styles.cargo}
              x="175"
              y="9"
              width={(boxWidth * loadWidth) / 100}
              height="204"
              fill={fillColor}
            />
          </g>
          <g id="static_part" data-name="static part">
            <circle
              id="wheels"
              className={styles.wheels}
              cx="109"
              cy="279"
              r="37"
            />
            <circle
              id="wheels"
              className={styles.wheels}
              cx="461"
              cy="279"
              r="37"
            />
            <polygon
              id="driver"
              className={styles.door}
              points="161 85 161 227 83 228 73.47 244 0 244 0 174.72 59.95 85 161 85"
            />
            <path
              id="engine"
              className={styles.engine}
              d="M0,275v-33.13l67,.13,11-20h92.56v19.22h17.44v-14.4h12v13.09h7v-11.78h90.5v8.51h17.5v-9.16h70v7.2h9v-7.85h218v14.4h6v9.16h11v8.51h-30v-6.89h-13v-9h-28v26h-46v9h-6.96s.96-43-45.04-43-43.5,43.5-43.5,43.5h-10.95v-15.03h-22.55v-9.47h-23v-9h-34.31v22h-101.69v-11h-9v11h-49v31.82h-8.53v-23.82h-5.47l-1-41h-67l-23,41H0Z"
            />
            <polygon
              id="window"
              className={styles.window}
              points="150 95 150 134 78 173 12 173 63.95 95 150 95"
            />
            <polygon
              id="doorKnob"
              className={styles.doorKnob}
              points="108.82 173 119.73 173 119.73 168.13 136 168.13 136 163.11 108.82 163.11 108.82 173"
            />
            <path
              id="headlights"
              className={styles.headlights}
              d="M0,208.71s14.13-2.71,14.13,13.29-.13,14-.13,14l-14,.08v-27.37Z"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
