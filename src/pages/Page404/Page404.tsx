import cat from '../../assets/images/cat.png';

function Page404() {
  return (
    <div className="undefined-page">
      <div className="undefined-page__block">
        <p className="undefined-page__text undefined-page__text-huge">4</p>
        <img src={cat} alt="cat icon" />
        <p className="undefined-page__text undefined-page__text-huge">4</p>
      </div>
      <p className="undefined-page__text">Page Not Found</p>
    </div>
  );
}

export default Page404;
