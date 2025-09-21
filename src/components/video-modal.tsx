// "use client"

// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { X } from "lucide-react"

// interface VideoModalProps {
//   isOpen: boolean
//   onClose: () => void
// }

// export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-6xl w-full p-0 bg-black border-0">
//         <DialogHeader className="sr-only">
//           <DialogTitle>Demo Video</DialogTitle>
//         </DialogHeader>

//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
//         >
//           <X className="w-5 h-5" />
//         </button>

//         {/* Video container */}
//         <div className="relative w-full aspect-video">
//           <iframe
//             src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1"
//             title="Demo Video"
//             className="w-full h-full rounded-lg"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           />
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X } from "lucide-react"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-full p-0 bg-black border-0 md:max-w-[90vw] lg:max-w-[60vw]">
        <DialogHeader className="sr-only">
          <DialogTitle>Demo Video</DialogTitle>
        </DialogHeader>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video container */}
        <div className="relative w-full aspect-video">
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1"
            title="Demo Video"
            className="w-full h-full rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}