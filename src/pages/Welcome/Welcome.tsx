import { useAuthState } from 'react-firebase-hooks/auth';
import { DeveloperInfo, WelcomeBtnsAnonim, WelcomeBtnsAuth } from '../../components';
import projectImageObj from '../../assets/images/project.png';
import rssImageObj from '../../assets/images/rssckool-yellow.jpg';
import { auth } from '../../utils/firebase';

function Welcome() {
  const [user] = useAuthState(auth);

  return (
    <div className="welcome-page">
      <div className="wrapper">
        <div className="welcome-page__container">
          {user ? <WelcomeBtnsAuth /> : <WelcomeBtnsAnonim />}
          <div className="project-info">
            <h2 className="project-info__title">About team</h2>
            <div className="project-info__devs">
              <DeveloperInfo
                ghLink="https://github.com/sch-aa-vk/"
                ghName="sch-aa-vk"
                devName="Amina Senchenko"
                ghAvatarLink="https://avatars.githubusercontent.com/u/89934145?v=4"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut faucibus, urna vel
                bibendum euismod, nunc diam fermentum diam, eu tincidunt erat odio non lorem.
                facilisi. Proin finibus pellentesque metus at eleifend. Vivamus sed neque tortor.
                tortor. Nullam vulputate porta massa non elementum. Cras molestie ipsum in viverra
                viverra luctus. In gravida.
              </DeveloperInfo>
              <DeveloperInfo
                ghLink="https://github.com/redcliphaloe"
                ghName="redcliphaloe"
                devName="Artem Siuzev"
                ghAvatarLink="https://avatars.githubusercontent.com/u/14157545?v=4"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut faucibus, urna vel
                bibendum euismod, nunc diam fermentum diam, eu tincidunt erat odio non lorem.
                facilisi. Proin finibus pellentesque metus at eleifend. Vivamus sed neque tortor.
                tortor. Nullam vulputate porta massa non elementum. Cras molestie ipsum in viverra
                viverra luctus. In gravida.
              </DeveloperInfo>
              <DeveloperInfo
                ghLink="https://github.com/EvgeniaM6"
                ghName="EvgeniaM6"
                devName="Yevheniia Miniukova"
                ghAvatarLink="https://avatars.githubusercontent.com/u/93492831?v=4"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut faucibus, urna vel
                bibendum euismod, nunc diam fermentum diam, eu tincidunt erat odio non lorem.
                facilisi. Proin finibus pellentesque metus at eleifend. Vivamus sed neque tortor.
                tortor. Nullam vulputate porta massa non elementum. Cras molestie ipsum in viverra
                viverra luctus. In gravida.
              </DeveloperInfo>
            </div>
            <h2 className="project-info__title">About project</h2>
            <div className="project-info__container flex-reverse">
              <div className="project-info__content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam molestie mi magna,
                vitae vitae fermentum ligula pharetra sit amet. Vivamus sapien massa, pharetra ut
                hendrerit nec, dignissim eu leo. Donec vulputate nisi at eros facilisis ullamcorper.
                Mauris in congue tortor. Duis dictum bibendum odio eu tempor. Suspendisse tellus
                tellus, convallis non laoreet nec, auctor id dolor. Donec sit amet varius erat.
                Phasellus semper dui in laoreet consectetur. Donec eu mattis libero. Sed vel lorem
                rhoncus, placerat nunc ut, lacinia libero. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Fusce blandit, ante a dapibus fermentum, dui odio ultricies elit,
                erat elit ac enim.
              </div>
              <div className="project-info__image">
                <img src={projectImageObj} alt="project" className="project-info__image-img" />
              </div>
            </div>
            <h2 className="project-info__title">About course</h2>
            <div className="project-info__container">
              <div className="project-info__content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam molestie mi magna,
                vitae vitae fermentum ligula pharetra sit amet. Vivamus sapien massa, pharetra ut
                hendrerit nec, dignissim eu leo. Donec vulputate nisi at eros facilisis ullamcorper.
                Mauris in congue tortor. Duis dictum bibendum odio eu tempor. Suspendisse tellus
                tellus, convallis non laoreet nec, auctor id dolor. Donec sit amet varius erat.
                Phasellus semper dui in laoreet consectetur. Donec eu mattis libero. Sed vel lorem
                rhoncus, placerat nunc ut, lacinia libero. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Fusce blandit, ante a dapibus fermentum, dui odio ultricies elit,
                sed sed posuere erat elit ac enim.
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
