"use client";

import * as React from "react";
import { supabase } from "@/lib/ClientSupabase";
import { useRouter } from "next/navigation";


import { Input } from "../../components/ui/Input";
import { Label } from "../../components/ui/Label";




export function InputField({
    id,
    label,
    placeholder,
    value,
    onChange,
    type,
  }: any) {
    return (
      <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }