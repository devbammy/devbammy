import styles from './loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      {/* Background Panels that slide away */}
      <div className={`${styles.panel} ${styles.topPanel}`} />
      <div className={`${styles.panel} ${styles.bottomPanel}`} />

      {/* Content Layer */}
      <div className={styles.content}>
        <div className={styles.textMask}>
          <h1 className={styles.brand}>devBammy</h1>
        </div>
      </div>
    </div>
  );
};

export default Loader;
