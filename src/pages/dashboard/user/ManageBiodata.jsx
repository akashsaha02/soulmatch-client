import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Heart, Loader2, Save, UserRound, MapPin } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useMyBiodata from "@/hooks/useMyBiodata";
import Loader from "@/components/shared/Loader";
import { DashboardPage, Panel } from "@/components/dashboard/DashboardKit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DIVISIONS } from "@/lib/biodata";
import { selectClassNames } from "@/lib/selectStyles";
import { cn } from "@/lib/utils";

const weightOptions = Array.from({ length: 101 }, (_, i) => ({ value: i + 30, label: `${i + 30} kg` })); // 30kg to 130kg
const partnerAgeOptions = Array.from({ length: 52 }, (_, i) => ({ value: i + 18, label: `${i + 18} years` })); // 18 to 70 years
const occupationOptions = ["Engineer", "Doctor", "Teacher", "Business", "Student", "Other"].map((v) => ({ value: v, label: v }));
const divisions = DIVISIONS.map((d) => ({ value: d, label: d }));
const genderOptions = [{ value: "Male", label: "Male" }, { value: "Female", label: "Female" }];

const races = [
  { value: "Black", label: "Black" },
  { value: "White", label: "White" },
  { value: "Indian", label: "Indian" },
  { value: "Hispanic", label: "Hispanic" },
  { value: "Asian", label: "Asian" },
  { value: "MiddleEastern", label: "Middle Eastern" },
  { value: "Native American", label: "Native American" },
  { value: "Pacific Islander", label: "Pacific Islander" },
  { value: "Mixed", label: "Mixed" },
  { value: "Other", label: "Other" },
];

const heightOptions = [
  { value: "4 feet 6 inch", label: "4'6\"" },
  { value: "4 feet 8 inch", label: "4'8\"" },
  { value: "4 feet 10 inch", label: "4'10\"" },
  { value: "5 feet 0 inch", label: "5'0\"" },
  { value: "5 feet 2 inch", label: "5'2\"" },
  { value: "5 feet 4 inch", label: "5'4\"" },
  { value: "5 feet 6 inch", label: "5'6\"" },
  { value: "5 feet 8 inch", label: "5'8\"" },
  { value: "5 feet 10 inch", label: "5'10\"" },
  { value: "6 feet 0 inch", label: "6'0\"" },
  { value: "6 feet 2 inch", label: "6'2\"" },
  { value: "6 feet 4 inch", label: "6'4\"" },
  { value: "6 feet 6 inch", label: "6'6\"" },
]

const Field = ({ label, htmlFor, error, className, children }) => (
  <div className={cn("space-y-2", className)}>
    <Label htmlFor={htmlFor}>{label}</Label>
    {children}
    {error && <p className="text-xs text-destructive">{error.message}</p>}
  </div>
);

const SelectField = ({ name, label, control, errors, options, placeholder, rules }) => (
  <Field label={label} htmlFor={name} error={errors[name]}>
    <Controller
      name={name}
      control={control}
      rules={rules ?? { required: `${label} is required` }}
      render={({ field }) => (
        <Select {...field} inputId={name} options={options} placeholder={placeholder || "Select…"} classNames={selectClassNames} />
      )}
    />
  </Field>
);

const ManageBiodata = () => {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [myBiodata, loading] = useMyBiodata();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!myBiodata) return;
    const asOption = (v) => (v ? { value: v, label: v } : null);
    reset({
      biodataType: asOption(myBiodata.biodataType),
      name: myBiodata.name,
      fatherName: myBiodata.fatherName,
      motherName: myBiodata.motherName,
      profileImage: myBiodata.profileImage,
      race: races.find((r) => r.value === myBiodata.race) || asOption(myBiodata.race),
      height: heightOptions.find((h) => h.value === myBiodata.height) || asOption(myBiodata.height),
      weight: myBiodata.weight,
      occupation: myBiodata.occupation,
      dob: myBiodata.dob ? new Date(myBiodata.dob) : null,
      presentDivision: asOption(myBiodata.presentDivision),
      permanentDivision: asOption(myBiodata.permanentDivision),
      mobileNumber: myBiodata.mobileNumber,
      partnerAge: myBiodata.partnerAge,
      partnerHeight: heightOptions.find((h) => h.value === myBiodata.partnerHeight) || asOption(myBiodata.partnerHeight),
      partnerWeight: myBiodata.partnerWeight,
    });
  }, [myBiodata, reset]);

  if (loading) return <Loader fullScreen={false} />

  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      const payload = {
        userEmail: user.email,
        name: data.name,
        fatherName: data.fatherName,
        motherName: data.motherName,
        biodataType: data.biodataType?.value,
        profileImage: data.profileImage,
        race: data.race?.value,
        height: data.height?.value,
        weight: data.weight,
        occupation: data.occupation,
        dob: data.dob,
        presentDivision: data.presentDivision?.value,
        permanentDivision: data.permanentDivision?.value,
        mobileNumber: data.mobileNumber,
        partnerAge: data.partnerAge,
        partnerHeight: data.partnerHeight?.value,
        partnerWeight: data.partnerWeight,
      };

      const response = await axiosSecure.post("/biodatas", payload);
      toast.success(response.status === 201 ? "Biodata published!" : "Biodata updated", {
        description: "Your profile is now visible to other members.",
      });
      queryClient.invalidateQueries({ queryKey: ["my-biodata", user.email] });
      queryClient.invalidateQueries({ queryKey: ["biodatas"] });
      navigate("/dashboard/user-home");
    } catch {
      toast.error("Couldn't save your biodata. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const shared = { control, errors };

  return (
    <DashboardPage
      title={myBiodata ? "Edit biodata" : "Create biodata"}
      description="Complete, honest details help families find you faster."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Panel title={<span className="flex items-center gap-2"><UserRound className="h-4 w-4 text-primary" /> About you</span>} bodyClassName="grid gap-5 p-6 md:grid-cols-2">
          <Field label="Full name" htmlFor="name" error={errors.name}>
            <Input id="name" placeholder="Your full name" {...register("name", { required: "Name is required" })} />
          </Field>
          <Field label="Profile image link" htmlFor="profileImage" error={errors.profileImage}>
            <Input id="profileImage" type="url" placeholder="https://…" {...register("profileImage", { required: "Profile image link is required" })} />
          </Field>
          <SelectField name="biodataType" label="Gender" options={genderOptions} {...shared} />
          <Field label="Date of birth" htmlFor="dob" error={errors.dob}>
            <Controller
              name="dob"
              control={control}
              defaultValue={null}
              rules={{ required: "Date of birth is required" }}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  id="dob"
                  selected={value}
                  onChange={onChange}
                  dateFormat="d MMMM yyyy"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={60}
                  maxDate={new Date()}
                  wrapperClassName="w-full"
                  className="flex h-11 w-full rounded-xl border border-input bg-white px-4 text-sm focus-visible:border-primary/50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/10"
                  placeholderText="Select date"
                />
              )}
            />
          </Field>
          <SelectField name="race" label="Race" options={races} {...shared} />
          <SelectField name="occupation" label="Occupation" options={occupationOptions} {...shared} />
          <SelectField name="height" label="Height" options={heightOptions} {...shared} />
          <SelectField name="weight" label="Weight" options={weightOptions} {...shared} />
          <Field label="Father's name" htmlFor="fatherName" error={errors.fatherName}>
            <Input id="fatherName" placeholder="Father's name" {...register("fatherName", { required: "Father's name is required" })} />
          </Field>
          <Field label="Mother's name" htmlFor="motherName" error={errors.motherName}>
            <Input id="motherName" placeholder="Mother's name" {...register("motherName", { required: "Mother's name is required" })} />
          </Field>
        </Panel>

        <Panel title={<span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Location & contact</span>} bodyClassName="grid gap-5 p-6 md:grid-cols-3">
          <SelectField name="presentDivision" label="Present division" options={divisions} {...shared} />
          <SelectField name="permanentDivision" label="Permanent division" options={divisions} {...shared} />
          <Field label="Mobile number" htmlFor="mobileNumber" error={errors.mobileNumber}>
            <Input id="mobileNumber" type="tel" placeholder="+880…" {...register("mobileNumber", { required: "Mobile number is required" })} />
          </Field>
        </Panel>

        <Panel title={<span className="flex items-center gap-2"><Heart className="h-4 w-4 text-primary" /> Partner expectations</span>} bodyClassName="grid gap-5 p-6 md:grid-cols-3">
          <SelectField name="partnerAge" label="Partner's age" options={partnerAgeOptions} {...shared} />
          <SelectField name="partnerHeight" label="Partner's height" options={heightOptions} {...shared} />
          <SelectField name="partnerWeight" label="Partner's weight" options={weightOptions} {...shared} />
        </Panel>

        <div className="sticky bottom-4 z-10 flex justify-end">
          <Button type="submit" size="lg" disabled={isSaving} className="shadow-lift">
            {isSaving ? <Loader2 className="animate-spin" /> : <Save />}
            {isSaving ? "Saving…" : myBiodata ? "Save changes" : "Publish biodata"}
          </Button>
        </div>
      </form>
    </DashboardPage>
  );
};

export default ManageBiodata;
