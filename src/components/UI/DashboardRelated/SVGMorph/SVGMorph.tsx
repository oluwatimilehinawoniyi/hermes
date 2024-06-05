import { motion } from "framer-motion";

interface StatusProps {
  loading?: boolean;
  done?: boolean;
  text?: string;
}

type VariantKey = "initial" | "loading" | "done";

const ButtonContent: React.FC<{ status: StatusProps }> = ({ status }) => {
  const buttonVariants = {
    initial: {
      path: "M5 12h14 M12 5v14", // Plus sign for "create"
      text: status.text === "vehicle" ? "Create Vehicle" : "Create Shipment",
    },
    loading: {
      path: "", // Placeholder since we'll use circles for the ellipsis
      text: "Creating...",
    },
    done: {
      path: "M20 6 9 17l-5-5", // Check mark for "created"
      text: "Created!",
    },
  };

  const currentVariant: VariantKey = status.loading
    ? "loading"
    : status.done
    ? "done"
    : "initial";

  return (
    <>
      {currentVariant !== "loading" ? (
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial="initial"
          animate={currentVariant}
        >
          <motion.path
            stroke="#fff"
            d={buttonVariants[currentVariant].path}
            variants={{
              initial: { d: buttonVariants.initial.path },
              done: { d: buttonVariants.done.path },
            }}
            transition={{
              default: { duration: 0.5 },
              fill: { duration: 0.2, delay: 0.3 },
            }}
          />
        </motion.svg>
      ) : (
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial="initial"
          animate="loading"
        >
          <motion.circle
            cx="5"
            cy="12"
            r="1"
            fill="#fff"
            variants={{
              initial: { opacity: 1 },
              loading: { opacity: [0, 1, 0] },
            }}
            transition={{
              repeat: Infinity,
              duration: 1,
              times: [0, 0.5, 1],
              ease: "easeInOut",
              delay: 0,
            }}
          />
          <motion.circle
            cx="12"
            cy="12"
            r="1"
            fill="#fff"
            variants={{
              initial: { opacity: 1 },
              loading: { opacity: [0, 1, 0] },
            }}
            transition={{
              repeat: Infinity,
              duration: 1,
              times: [0, 0.5, 1],
              ease: "easeInOut",
              delay: 0.2,
            }}
          />
          <motion.circle
            cx="19"
            cy="12"
            r="1"
            fill="#fff"
            variants={{
              initial: { opacity: 1 },
              loading: { opacity: [0, 1, 0] },
            }}
            transition={{
              repeat: Infinity,
              duration: 1,
              times: [0, 0.5, 1],
              ease: "easeInOut",
              delay: 0.4,
            }}
          />
        </motion.svg>
      )}
      <motion.span
        initial="initial"
        animate={currentVariant}
        variants={{
          initial: { opacity: 1 },
          loading: { opacity: 0.5 },
          done: { opacity: 1 },
        }}
        transition={{ duration: 0.5 }}
      >
        {buttonVariants[currentVariant].text}
      </motion.span>
    </>
  );
};

export default ButtonContent;
