import { useKeenSlider } from 'keen-slider/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SIZE } from '../../../../config/styles-vars';
import Loader from '../../../../shared/components/Loader/Loader';
import WidgetContainer from '../../../../shared/components/WidgetContainer/WidgetContainer';
import { STORE_STATUS } from '../../../../shared/models';
import { RootState } from '../../../../store/store';
import { selectUpcomingWorkshops } from '../../slice/workshop.selectors';
import WorkshopCard from '../WorkshopCard/WorkshopCard';

const WorkshopWidget = () => {
  const workshops = useSelector(selectUpcomingWorkshops);
  const status = useSelector((state: RootState) => state.workshops.status);
  const [sliderOptions, setSliderOptions] = useState({
    slides: {
      perView: 2,
      spacing: 10,
    },
  });

  useEffect(() => {
    const updateSliderOptions = (e) => {
      setSliderOptions({
        slides: {
          perView: e.matches ? 1 : 2,
          spacing: 10,
        },
      });
    };

    const matchMediaQuery = window.matchMedia(`(max-width: ${SIZE.TABLET})`);
    matchMediaQuery.addEventListener('change', updateSliderOptions);
    updateSliderOptions(matchMediaQuery);
    return () => {
      matchMediaQuery.removeEventListener('change', updateSliderOptions);
    };
  }, []);

  const [ref] = useKeenSlider<HTMLDivElement>(sliderOptions);

  return (
    <WidgetContainer title="Upcoming Workshops">
      {status === STORE_STATUS.LOADING ? (
        <Loader />
      ) : (
        <div ref={ref} className="keen-slider">
          {workshops.map((workshop, i) => (
            <div
              key={workshop.uid}
              className={`keen-slider__slide number-slide${i + 1}`}
            >
              <WorkshopCard title={workshop.name} image={workshop.image} />
            </div>
          ))}
        </div>
      )}
    </WidgetContainer>
  );
};

export default WorkshopWidget;
