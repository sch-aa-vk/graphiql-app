import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { DeveloperInfo, WelcomeBtnsAnonim, WelcomeBtnsAuth } from '../../components';
import projectImageObj from '../../assets/images/project.png';
import rssImageObj from '../../assets/images/rssckool-yellow.jpg';
import { auth } from '../../utils/firebase';

function Welcome() {
  const [user] = useAuthState(auth);
  const { t } = useTranslation();

  return (
    <div className="welcome-page">
      <div className="wrapper">
        <div className="welcome-page__container">
          {user ? <WelcomeBtnsAuth /> : <WelcomeBtnsAnonim />}
          <div className="project-info">
            <h2 className="project-info__title">{t('aboutTeam')}</h2>
            <div className="project-info__devs">
              <DeveloperInfo
                ghLink="https://github.com/sch-aa-vk/"
                ghName="sch-aa-vk"
                devName={t('amina')}
                ghAvatarLink="https://avatars.githubusercontent.com/u/89934145?v=4"
              >
                {t('aminaDescription')}
              </DeveloperInfo>
              <DeveloperInfo
                ghLink="https://github.com/redcliphaloe"
                ghName="redcliphaloe"
                devName={t('artem')}
                ghAvatarLink="https://avatars.githubusercontent.com/u/14157545?v=4"
              >
                {t('artemDescription')}
              </DeveloperInfo>
              <DeveloperInfo
                ghLink="https://github.com/EvgeniaM6"
                ghName="EvgeniaM6"
                devName={t('yevheniia')}
                ghAvatarLink="https://avatars.githubusercontent.com/u/93492831?v=4"
              >
                {t('yevheniiaDescription')}
              </DeveloperInfo>
            </div>
            <h2 className="project-info__title">{t('aboutProject')}</h2>
            <div className="project-info__container flex-reverse">
              <div className="project-info__content">{t('aboutProjectText')}</div>
              <div className="project-info__image">
                <img src={projectImageObj} alt="project" className="project-info__image-img" />
              </div>
            </div>
            <h2 className="project-info__title">{t('aboutCourse')}</h2>
            <div className="project-info__container">
              <div className="project-info__content">
                {t('aboutCourseText')}
                {t('learnMore')}
                <a
                  className="project-info__link"
                  href="https://rs.school/js/"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://rs.school/js/
                </a>
              </div>
              <div className="project-info__image">
                <img
                  src={rssImageObj}
                  alt="course - rolling scope school"
                  className="project-info__image-img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
