export function WorkCard({
  src,
  link,
  title,
  description,
  tags,
  index,
}: WorkCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      className="block rounded-xl overflow-hidden mb-8 py-8 bg-zinc-950 work-card"
    >
      <div className="flex flex-col md:flex-row">
        {index % 2 === 1 ? (
          <img
            src={src}
            alt={title}
            className="w-full md:w-1/2 hidden md:block"
          />
        ) : null}
        <img
          src={src}
          alt={title}
          className="w-full md:w-1/2 block md:hidden"
        />
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="text-4xl font-semibold font-brand">{title}</h3>
            <p className="mt-2 text-gray-400 font-spline-mono">{description}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-700 text-gray-300 text-sm font-spline-mono px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        {index % 2 === 0 ? (
          <img
            src={src}
            alt={title}
            className="w-full md:w-1/2 hidden md:block"
          />
        ) : null}
      </div>
    </a>
  );
}

export interface WorkCardProps {
  src: string;
  link: string;
  title: string;
  description: string;
  tags: string[];
  index: number;
}
