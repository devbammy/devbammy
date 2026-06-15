import styles from './picture.module.scss';

const Picture = ({ img, alt, name }) => {
  return (
    <section className={styles.picture}>
      <img src={img} alt={alt} />
      <div className={styles.nameTag}>{name}</div>
    </section>
  );
};

export default Picture;
