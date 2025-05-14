import { logoIconsList } from '../constants/index.js';

const LogoSection = () => {
  // Combine the list once to avoid repeated mapping
  const repeatedIcons = [...logoIconsList, ...logoIconsList];

  return (
    <div className="md:my-20 my-10 relative">
      <div className="gradient-edge" />
      <div className="gradient-edge" />
      <div className="marquee h-52">
        <div className="marquee-box md:gap-12 gap-5">
          {repeatedIcons.map((icon, index) => (
            <div key={`${icon.name}-${index}`} className="flex-none flex-center marquee-item">
              <img src={icon.imgPath} alt={icon.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoSection;
