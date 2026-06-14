import Card from '../utils/card/Card';
import Title from '../utils/title/Title';
import styles from './homeComps.module.scss';

const Services = ({ services }) => {
  return (
    <div className={styles.services}>
      <Title text="Services" />

      <div className={styles.serviceLists}>
        {services?.map((service, i) => (
          <Card key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Services;
