import { ArchiveX } from "lucide-react"

/**
 * 
 * @param title @type {string}
 * @param description @type {string}
 * @returns component that displays a message when no content is available
 */
export const NoContentAvailable = ({title,description}: {title: string, description: string}) => {
    return (
        <div className="flex flex-col items-center justify-center place-content-center">
            <ArchiveX className="w-16 h-16" />
            <h3 className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">{title}</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
    )
}