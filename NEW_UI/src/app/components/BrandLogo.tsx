import logoSrc from '../../assets/f267816345d6444779918b0e213ef56871972bde.png';

interface BrandLogoProps {
  imageClassName?: string;
  subtitle?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export default function BrandLogo({
  imageClassName = 'h-12 w-auto',
  subtitle,
  titleClassName,
  subtitleClassName,
}: BrandLogoProps) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <img
        src={logoSrc}
        alt="Logo da Inatos"
        className={imageClassName}
        draggable={false}
      />
      {subtitle && (
        <p className={subtitleClassName ?? 'text-xs text-white/60 font-medium tracking-wide'}>
          {subtitle}
        </p>
      )}
    </div>
  );
}