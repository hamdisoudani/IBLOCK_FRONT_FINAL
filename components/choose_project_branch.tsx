"use client";

type ProjectBranch = {
    mainCopy?: string;
    mainWork?: string;
}

export const ChooseProjectBranch: React.FC<ProjectBranch> = ({ mainCopy, mainWork }) => {
    return (
        <div>
            <h1>{mainCopy}</h1>
            <h2>{mainWork}</h2>
        </div>
    )
}