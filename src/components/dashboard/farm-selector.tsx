"use client";

import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Farm } from "@/types/farm";
import { useState } from "react";

interface FarmSelectorProps {
  farms: Farm[];
  selectedFarm: Farm;
  onSelectFarm: (farm: Farm) => void;
}

export function FarmSelector({
  farms,
  selectedFarm,
  onSelectFarm,
}: FarmSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[240px] justify-between"
        >
          {selectedFarm.name}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0">
        <Command>
          <CommandInput placeholder="Search farms..." />
          <CommandList>
            <CommandEmpty>No farms found.</CommandEmpty>
            <CommandGroup>
              {farms.map((farm) => (
                <CommandItem
                  key={farm.id}
                  value={farm.name}
                  onSelect={() => {
                    onSelectFarm(farm);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      selectedFarm.id === farm.id ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {farm.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
