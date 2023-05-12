import githubIcon from '../../assets/icons/github.svg';
import { TDeveloperInfoProps } from './TDeveloperInfoProps';

function DeveloperInfo(props: TDeveloperInfoProps) {
  const { ghLink, ghName, devName, ghAvatarLink, children } = props;

  return (
    <div className="project-info__container dev-info">
      <div className="dev-info__content">
        <h3 className="dev-info__name">{devName}</h3>
        <p className="dev-info__gh dev-github">
          <a href={ghLink} className="dev-github__link">
            <img src={githubIcon} alt="github-icon" className="dev-github__link-icon" />
            <span className="dev-github__link-name">{ghName}</span>
          </a>
        </p>
        <p className="dev-info__about">{children}</p>
      </div>
      <div className="dev-info__photo">
        <img src={ghAvatarLink} alt={`${ghName}-avatar`} className="dev-info__photo-img" />
      </div>
    </div>
  );
}

export default DeveloperInfo;
