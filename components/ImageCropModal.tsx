// import {
//   Button,
//   Modal,
//   ModalBody,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
// } from "@heroui/react";
// import { PinturaEditor } from "@pqina/react-pintura";
// import { getEditorDefaults } from "@pqina/pintura";
// import "@pqina/pintura/pintura.css";
// import { useState } from "react";
// export default function ImageCropModal({
//   isOpen,
//   onOpenChange,
//   imageUrl,
//   doneImageResult,
// }: {
//   isOpen: boolean;
//   onOpenChange: (open: boolean) => void;
//   imageUrl: string;
//   doneImageResult: (result: string) => void;
// }) {
//   const doneResult = (url: string) => {
//     doneImageResult(url);
//     onOpenChange(false);
//   };

//   return (
//     <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"5xl"}>
//       <ModalContent>
//         {(onClose) => (
//           <>
//             <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
//             <ModalBody>
//               <div style={{ height: "80vh" }}>
//                 <PinturaEditor
//                   {...getEditorDefaults()}
//                   src={imageUrl}
//                   onProcess={(res: any) => doneResult(URL.createObjectURL(res.dest))}
//                 />

//                 {/* {inlineResult && <img src={inlineResult} alt="" />} */}
//               </div>
//             </ModalBody>
//             <ModalFooter>
//               <Button color="danger" variant="light" onPress={onClose}>
//                 Close
//               </Button>
//               <Button color="primary" onPress={onClose}>
//                 Action
//               </Button>
//             </ModalFooter>
//           </>
//         )}
//       </ModalContent>
//     </Modal>
//   );
// }
