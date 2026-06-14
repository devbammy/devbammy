import Me from '../../../assets/me.jpg';
import styles from './avatar.module.scss';

const Avatar = () => {
  return (
    <div className={styles.profile}>
      <div className={styles.profile_image}>
        <img src={Me} alt="Emmanuel Bamidele profile picture" />
      </div>
      <div className={styles.profile_details}>
        <h4>Emmanuel Bamidele</h4>
        <p>Full Stack Web/Mobile Engr.</p>
      </div>
    </div>
  );
};

export default Avatar;
