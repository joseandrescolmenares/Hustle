// import * as React from "react";
// import { supabase } from "@/lib/ClientSupabase";
// import { useRouter } from "next/navigation";

// import { Button } from "../components/ui/Button";
// import axios from "axios";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "../components/ui/dialog";
// import { Input } from "../components/ui/Input";
// import { Label } from "../components/ui/Label";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../components/ui/select";
// import { InputField } from "./components/InputField";
// import { SelectGroup, SelectLabel } from "@radix-ui/react-select";

// export default function Onboarding() {
//   const router = useRouter();
//   const [loandingData, setLoandingData] = React.useState(false);
//   const [inputTeam, setInputTeam] = React.useState({
//     nameCompany: "",
//     firstname: "",
//     // phone: "",
//     organizationSize: "",
//     crmName: "",
//     email: "",
//     // codeNumber: "",
//   });

//   console.log(inputTeam);

//   const handleInputChange = (field: string, value: string) => {
//     setInputTeam({ ...inputTeam, [field]: value });
//   };

//   // const handleNumberChange = (value: string) => {
//   //   handleInputChange("codeNumber", value);
//   // };

//   const handleCreateTeam = async () => {
//     try {
//       const cleanedData = {
//         nameCompany: inputTeam?.nameCompany.trim(),
//         firstname: inputTeam.firstname.trim(),
//         // phone: inputTeam.phone.trim(),
//         organizationSize: inputTeam.organizationSize.trim(),
//         crmName: inputTeam.crmName.trim(),
//         email: inputTeam.email.trim(),
//         // codeNumber: inputTeam.codeNumber.trim(),
//       };
//       setLoandingData(true);
//       const data = await axios.post("/api/supabase/createTeam", cleanedData);
//       const result = data?.data;

//       if (result) {
//         router.push("/dashboard");
//       }
//     } catch (error) {
//       console.error("Error al crear el equipo:", error);
//     }
//   };

//   // const handleGuestLink = async () => {
//   //   try {
//   //     const dataLink = {
//   //       link: guestLink,
//   //     };
//   //     setLoandingData(true);
//   //     const data = await axios.post("/api/supabase/joinTeam", dataLink);
//   //     const result = data?.data;

//   //     if (result) {
//   //       router.push("/dashboard");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error al crear el equipo:", error);
//   //   }
//   // };

//   return (
//     <>
//       {loandingData ? (
//         <div className="flex justify-center items-center mt-20">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-customPurple  border-t-customPurple border-r-blue-300 border-r-2"></div>
//         </div>
//       ) : (
//         <Dialog open={true}>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Organization Details</DialogTitle>
//               <DialogDescription>
//                 Add crucial information for efficient management of products and
//                 clients.
//               </DialogDescription>
//             </DialogHeader>
//             <div>
//               <div className="space-y-4 py-2 pb-4">
//                 <div className="space-y-4 py-2 pb-4">
//                   <InputField
//                     type="text"
//                     id="nameCompany"
//                     label="Company name"
//                     placeholder="Hustle"
//                     value={inputTeam.nameCompany}
//                     onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                       handleInputChange("nameCompany", e.target.value)
//                     }
//                   />
//                   <InputField
//                     type="text"
//                     id="firstname"
//                     label="First Name"
//                     placeholder="Max Velasco"
//                     value={inputTeam.firstname}
//                     onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                       handleInputChange("firstname", e.target.value)
//                     }
//                   />
//                   <InputField
//                     type="email"
//                     id="email"
//                     label="email using CRM"
//                     placeholder="max@meethustle.io"
//                     value={inputTeam.email}
//                     onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                       handleInputChange("email", e.target.value)
//                     }
//                   />
//                   {/* <div className="flex justify-start  items-center ">
//                     <div>
//                       <Label>Phone number</Label>
//                       <div className="flex items-center gap-1">
//                         <Select
//                           onValueChange={(value) => handleNumberChange(value)}
//                         >
//                           <SelectTrigger className="w-[70px] mt-2">
//                             <SelectValue placeholder="+54" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectGroup>
//                               <SelectItem value="521">🇲🇽(+52)</SelectItem>
//                               <SelectItem value="549">🇦🇷(+54)</SelectItem>
//                               <SelectItem value="blueberry">Blueberry</SelectItem>
//                       <SelectItem value="grapes">Grapes</SelectItem>
//                       <SelectItem value="pineapple">Pineapple</SelectItem>
//                             </SelectGroup>
//                           </SelectContent>
//                         </Select>

//                         <InputField
//                           type="text"
//                           id="phone"
//                           label=""
//                           placeholder="11 190 230 01"
//                           value={inputTeam.phone}
//                           onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                             handleInputChange("phone", e.target.value)
//                           }
//                         />
//                       </div>
//                     </div>
//                   </div> */}
//                   <InputField
//                     type="text"
//                     id="crmName"
//                     label="What CRM do you use?*"
//                     placeholder="Hubspot"
//                     value={inputTeam.crmName}
//                     onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                       handleInputChange("crmName", e.target.value)
//                     }
//                   />
//                   <InputField
//                     type="number"
//                     id="organizationSize"
//                     label="How many sales representatives work in your company?"
//                     placeholder="10"
//                     value={inputTeam.organizationSize}
//                     onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                       handleInputChange("organizationSize", e.target.value)
//                     }
//                   />
//                 </div>
//               </div>
//               <DialogFooter className="border-b border-gray-400 rounded-md px-4 py-2">
//                 {/* <Button variant="outline">Cancel</Button> */}
//                 <Button type="submit" onClick={handleCreateTeam}>
//                   Continue
//                 </Button>
//               </DialogFooter>
//             </div>
//           </DialogContent>
//         </Dialog>
//       )}
//     </>
//   );
// }
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { InputField } from "./components/InputField";
import { Button } from "../components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/Form";
import { Input } from "../components/ui/Input";
import { Icons } from "../components/Icons/IconsAuth/IconsAuth";

export default function Onboarding() {
  const router = useRouter();
  const [loadingData, setLoadingData] = React.useState(false);

  const formSchema = z.object({
    nameCompany: z.string().min(2, { message: "Name Company is required" }),
    firstname: z.string().min(2, { message: "FirstName Company is required" }),
    organizationSize: z.string().optional(),
    crmName: z.string().min(1),
    email: z.string().email(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameCompany: "",
      firstname: "",
      organizationSize: "",
      crmName: "",
      email: "",
    },
  });

  const handleCreateTeam = async (values: z.infer<typeof formSchema>) => {
    const { email, nameCompany, firstname, organizationSize, crmName } = values;
    try {
      setLoadingData(true);
      await axios.post("api/sendEmail/sendOnboarding", { email, firstname });
      const cleanedData = {
        nameCompany: nameCompany.trim(),
        firstname: firstname.trim(),
        organizationSize: organizationSize?.trim(),
        crmName: crmName.trim(),
        email: email.trim(),
      };

      const data = await axios.post("/api/supabase/createTeam", cleanedData);
      const result = data?.data;

      if (result) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error al crear el equipo:", error);
    } finally {
      setLoadingData(true);
    }
  };

  return (
    <>
      {" "}
      {loadingData ? (
        <div className="flex justify-center items-center mt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-customPurple  border-t-customPurple border-r-blue-300 border-r-2"></div>
        </div>
      ) : (
        <Dialog open={true}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Organization Details</DialogTitle>
              <DialogDescription>
                Add crucial information for efficient management of products and
                clients.
              </DialogDescription>
            </DialogHeader>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleCreateTeam)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="nameCompany"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company name</FormLabel>
                        <FormControl>
                          <Input placeholder="Hustle" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Max velazco" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="name@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="crmName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What CRM do you use?</FormLabel>
                        <FormControl>
                          <Input placeholder="Hubspot" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organizationSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          How many sales representatives work in your company?
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="10" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="w-full" type="submit">
                    Continue
                  </Button>
                </form>
              </Form>

              <DialogFooter className="border-b border-gray-400 rounded-md px-4 py-2"></DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
