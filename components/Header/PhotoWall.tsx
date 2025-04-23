import { css } from "@emotion/css";
import clsx from "clsx";
import Image from "next/image";

const photos: string[] = [
  "/images/photo-wall/job1.png",
  "/images/photo-wall/JOB.jpeg",
 

];

type Props = {
  size?: number;
};

const PhotoWall: React.FC<Props> = ({ size = 1200 }) => {
  return (
    <div className="flex  gap-1" style={{ width: size, height: size }}>
      {photos.map((photo, index) => (
        <div
          key={photo}
          style={{ animationDelay: `${index * 0.5 + 0.5}s` }}
          className={clsx(
            "relative transition-[width]",
            "animate__animated animate__fadeInDown",
            css`
              width: ${size/2 }px;
              height: ${size}px;

              &:hover {
                width: ${size / 1}px;
              }
            `,
          )}
        >
          <Image
            fill
            priority
            src={photo}
            alt="Bagombeka Job"
            sizes="(max-width: 1200px) 400vw, (max-width: 100px) 50vw, 33vw"
            className={clsx("object-cover ", { "rounded-l": index === 0, "rounded-r": index === photos.length - 1 })}
          />
        </div>
      ))}
    </div>
  );
};

export default PhotoWall;
