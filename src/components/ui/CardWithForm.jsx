'use client'

import * as React from "react"
import { useState } from "react";
import { Button } from "@/components/ui/button"
// import { 29 LT zarib slab } from "next/font/google";
import {
  Card,
  CardContent,
//   CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CardWithForm() {
    const [form, setForm] = useState({
        sex: "",
        registrationNb: "",
        District: "",
        sect: "",
      });
    
      const [result, setResult] = useState(null);
      const [error, setError] = useState(false);
      function convertArabicToEnglishNumbers(input) {
        return input.replace(/[\u0660-\u0669]/g, function (d) {
          return d.charCodeAt(0) - 0x0660;
        });
      }

      const handleSearch = async () => {
        try {
          // Build the query string from form values
          const query = new URLSearchParams({
            sex: form.sex,
            registrationNb: form.registrationNb,
            District: form.District, // Make sure "District" is capitalized here to match backend
            sect: form.sect,
          });
      
          // Send GET request to the backend
          const res = await fetch(`/api/election?${query.toString()}`);
          const data = await res.json();
      
          // Show first matching result
          if (data.length > 0) {
            setResult(data[0]);
            setError(false);
          } else {
            setResult(null);
            setError(true); // or show "not found" message
          }
      
          console.log("Result data:", data);
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      };
      

    
  return (
    <>
<><img alt="My Image" src="/logo.jpg" className="w-40 h-auto m-auto border-1px" />
<p className="flex items-center justify-center font-bold font-[29LT-Zarid] text-2xl text-[#921B1F]">مشروع وعي</p>
</>
<Card className="w-full p-6 pt-2 font-bold shadow-xl m-auto mt-10" dir="rtl">
      <CardHeader>
        <CardTitle className="justify-center text-2xl text-[#921B1F]">معرفة مركز الإقتراع</CardTitle>
        {/* <CardDescription>     -click.</CardDescription> */}
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col  space-y-3">
              <Label htmlFor="name">المحلة</Label>
              <Select className="w-1/4" name="District" defaultValue="" onValueChange={(value) => setForm({ ...form, District: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="يرجى اختيار المحلة" />
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value="الزاهرية">الزاهرية</SelectItem>
                  <SelectItem value="القبة">القبة</SelectItem>
                  <SelectItem value="التل">التل</SelectItem>
                  <SelectItem value="التبانة">التبانة</SelectItem>
                  <SelectItem value="النوري">النوري</SelectItem>
                  <SelectItem value="المهاترة">المهاترة</SelectItem>
                  <SelectItem value="الرمانة">الرمانة</SelectItem>
                  <SelectItem value="الحديد">الحديد</SelectItem>
                  <SelectItem value="الحدادين">الحدادين</SelectItem>
                  <SelectItem value="السويقة">السويقة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-3">
              <Label htmlFor="framework">رقم القيد</Label>
            <Input id="name" placeholder="يرجى ادخال رقم القيد" name="registrationNb" defaultValue="" onChange={(e) =>
              setForm({ ...form, registrationNb: convertArabicToEnglishNumbers(e.target.value) })}
              className="w-1/4"
              />
            </div>
            <div className="flex flex-col space-y-3">
              <Label htmlFor="framework">الجنس</Label>
              <Select onValueChange={(value) => setForm({ ...form, sex: value })} name="sex" defaultValue="">
                <SelectTrigger id="framework">
                  <SelectValue placeholder="يرجى اختيار الجنس" />
                </SelectTrigger>
                <SelectContent   position="popper">
                  <SelectItem value="ذكر">ذكر</SelectItem>               
                  <SelectItem value="انثى">أنثى</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-3 w-max">
              <Label htmlFor="framework">الطائفة</Label>
              <Select name="sect" defaultValue="" onValueChange={(value) => setForm({ ...form, sect: value })}>
                <SelectTrigger id="framework">
                  <SelectValue className="w-200px" placeholder="يرجى اختيار الطائفة" />
                </SelectTrigger>
                <SelectContent  position="popper">
                  <SelectItem value="سني">سني</SelectItem>
                  <SelectItem value="علوي">علوي</SelectItem>
                  <SelectItem value="شيعي">شيعي</SelectItem>
                  <SelectItem value="ماروني">ماروني</SelectItem>
                  <SelectItem value="اسرائيلي">اسرائيلي</SelectItem>
                  <SelectItem value="كلدان">كلدان</SelectItem>
                  <SelectItem value="كلدان كاثوليك">كلدان كاثوليك</SelectItem>
                  <SelectItem value="أرمن كاثوليك">أرمن كاثوليك</SelectItem>
                  <SelectItem value="أرمن ارثوذكس">أرمن ارثوذكس</SelectItem>
                  <SelectItem value="روم ارثوذكس">روم ارثوذكس</SelectItem>
                  <SelectItem value="روم كاثوليك">روم كاثوليك</SelectItem>
                  <SelectItem value="انجيلي">انجيلي</SelectItem>
                  <SelectItem value="درزي">درزي</SelectItem>
                  <SelectItem value="سريان ارثوذكس">سريان ارثوذكس</SelectItem>
                  <SelectItem value="سريان كاثوليك">سريان كاثوليك</SelectItem>
                  <SelectItem value="لاتين">لاتين</SelectItem>
                </SelectContent>
              </Select>
            </div>
        
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="w-full bg-[#921B1F]" onClick={handleSearch}>بحث</Button>
      </CardFooter>
      {/* <CardContent className="mt-6 space-y-2 text-right bg-gray-50 p-4 rounded-xl shadow-sm">
      {error && (
        <p className="text-red-500 flex items-center justify-center text-lg">
المعلومات خاطئة يرجى المحاولة مرة أخرى بعد التأكد من صحة المعلومة</p>
      )}
           </CardContent> */}
      {result && !error &&(
          <CardContent className="mt-6 space-y-2 text-right bg-gray-50 p-4 rounded-xl shadow-sm">
            <p className="text-xl font-bold">اسم المركز: {result.Center}</p>
            <p className="text-lg">رقم الغرفة: {result.RoomNb}</p>
            {/* <p className="text-lg">رقم الغرفة: {result.location}</p> */}
            <a href={result.location}   target="_blank" rel="noopener noreferrer" className="text-blue-600 underline cursor-pointer">
عرض الموقع على الخريطة</a>
          </CardContent>
        )}
{error && (<p className="text-red-500 flex items-center justify-center text-lg">
المعلومات خاطئة يرجى المحاولة مرة أخرى بعد التأكد من صحة المعلومة</p>)}
    </Card>
    </>
  )
}
