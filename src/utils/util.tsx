export function RenderJsonAsHtml({ data, level = 1 }: { data: any; level?: number }) {
    if (typeof data === "object" && data !== null) {
      if (Array.isArray(data)) {
        return (
          <ul className="ml-4 list-disc text-gray-700">
            {data.map((item, index) => (
              <li key={index}>
                <RenderJsonAsHtml data={item} level={level + 1} />
              </li>
            ))}
          </ul>
        );
      } else {
        return (
          <div className={`mt-4 ${level === 1 ? "border-l-4 border-blue-500 pl-3" : ""}`}>
            {Object.keys(data).map((key) => {
              const formattedKey = key.replace(/([A-Z])/g, " $1").replace(/_/g, " ").trim();
              return (
                <div key={key} className="mb-2">
                  <h2 className={`font-semibold ${level === 1 ? "text-xl text-blue-600" : "text-lg text-gray-800"}`}>
                    {formattedKey}
                  </h2>
                  <div className="ml-4 text-gray-600">
                    <RenderJsonAsHtml data={data[key]} level={level + 1} />
                  </div>
                </div>
              );
            })}
          </div>
        );
      }
    }
    return <span className="text-gray-700">{String(data)}</span>;
  }
  