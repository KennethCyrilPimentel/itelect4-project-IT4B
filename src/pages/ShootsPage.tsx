// src/pages/ShootsPage.tsx
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import type { ApiShoot } from "../../types/index";
import { shootSchema } from "../schemas/shootSchema";
import type { ShootFormValues } from "../schemas/shootSchema";
import ShootCard from "../components/ShootCard";
import { fetchShoots, createShoot } from "../api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// The useState for newType/newLocation is GONE -- useForm holds the values now

function ShootsPage() {
  const queryClient = useQueryClient();

  // 1. READ -- unchanged
  const { data, isPending, isError, error } = useQuery<ApiShoot[]>({
    queryKey: ["shoots"],
    queryFn: fetchShoots,
  });

  const [searchTerm, setSearchTerm] = useState<string>("");

  // useForm holds the values, runs the schema, and stores the errors.
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ShootFormValues>({
    resolver: zodResolver(shootSchema),
    mode: "onBlur",
    defaultValues: { type: "", location: "", scheduledDate: "" },
  });

  // 2. WRITE -- mutationFn does the POST, onSuccess cleans up after it
  const addShoot = useMutation({
    mutationFn: createShoot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shoots"] });
      reset(); // clears every field at once
    },
  });

  // handleSubmit only calls this after the schema passes.
  const onSubmit = (values: ShootFormValues): void => {
    addShoot.mutate({
      clientId: 1,
      photographerId: 1,
      type: values.type,
      status: 0, // ShootStatus.Requested
      scheduledDate: new Date(values.scheduledDate).toISOString(),
      location: values.location,
      price: 0,
    });
  };

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => setSearchTerm(e.target.value);

  if (isPending) {
    return <div className="animate-pulse p-6 text-gray-500">Loading shoots...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        {error.message} -- is json-server running on port 3001?
      </div>
    );
  }

  const filteredShoots = data.filter((s) =>
    s.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Shoots
      </h2>

      {/* Form to request a shoot -- React Hook Form + Zod now guard it */}
      <form onSubmit={handleSubmit(onSubmit)}
        className="mb-6 grid gap-4 rounded-lg border border-gray-200 p-4
          dark:border-gray-700">
        <div className="grid gap-1.5">
          <Label htmlFor="type" className="text-foreground">
            Shoot type</Label>
          <Input id="type" {...register("type")}
            aria-invalid={errors.type ? true : undefined}
            placeholder="e.g. Wedding" />
          {errors.type && (
            <p className="text-sm text-red-600">{errors.type.message}</p>
          )}
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="location" className="text-foreground">
            Location</Label>
          <Input id="location" {...register("location")}
            aria-invalid={errors.location ? true : undefined}
            placeholder="e.g. Tagaytay" />
          {errors.location && (
            <p className="text-sm text-red-600">{errors.location.message}</p>
          )}
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="scheduledDate" className="text-foreground">
            Shoot date</Label>
          <Input id="scheduledDate" type="date" {...register("scheduledDate")}
            aria-invalid={errors.scheduledDate ? true : undefined} />
          {errors.scheduledDate && (
            <p className="text-sm text-red-600">{errors.scheduledDate.message}</p>
          )}
        </div>

        {/* Never disabled on "invalid": clicking it is what shows the
            error messages. Only a save in flight disables it. */}
        <Button type="submit"
          disabled={addShoot.isPending}
          className="justify-self-start">
          {addShoot.isPending ? "Requesting..." : "Request Shoot"}
        </Button>
      </form>
      {addShoot.isError && (
        <p className="mb-4 text-sm text-red-700">{addShoot.error.message}</p>
      )}

      <Label htmlFor="search" className="sr-only">Search shoots</Label>
      <Input id="search" value={searchTerm}
        onChange={handleSearchChange} placeholder="Search shoots..." />

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredShoots.map((s) => (
          <Link key={s.id} to={`/shoots/${s.id}`}>
            <ShootCard shoot={s} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ShootsPage;