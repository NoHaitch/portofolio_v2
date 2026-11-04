'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type FacetOption = { value: string; count: number }

type Props = {
  applicationTypeOptions: FacetOption[]
  applicationTypes: string[]
  fieldOptions: FacetOption[]
  fields: string[]
  applicationTypesLabel: string
  fieldsLabel: string
}

export function WorkFacetFilters({
  applicationTypeOptions,
  applicationTypes: initialApplicationTypes,
  fieldOptions,
  fields: initialFields,
  applicationTypesLabel,
  fieldsLabel,
}: Props) {
  const [applicationTypes, setApplicationTypes] = useState(initialApplicationTypes)
  const [fields, setFields] = useState(initialFields)

  const toggleValue = (
    values: string[],
    setValues: (values: string[]) => void,
    value: string,
    checked: boolean,
  ) => {
    setValues(
      checked ? [...values, value] : values.filter((selectedValue) => selectedValue !== value),
    )
  }

  return (
    <>
      {applicationTypeOptions.length > 0 ? (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button type="button" variant="outline" className="rounded-xl font-medium" />}
          >
            {applicationTypesLabel}
            {applicationTypes.length > 0 ? ` (${applicationTypes.length})` : ''}
            <ChevronDown aria-hidden="true" className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="max-h-64 min-w-52 overflow-y-auto">
            <DropdownMenuGroup>
              <DropdownMenuLabel>{applicationTypesLabel}</DropdownMenuLabel>
              {applicationTypeOptions.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.value}
                  aria-label={option.value}
                  checked={applicationTypes.includes(option.value)}
                  onCheckedChange={(checked) =>
                    toggleValue(applicationTypes, setApplicationTypes, option.value, checked)
                  }
                >
                  {option.value}
                  <span aria-hidden="true" className="text-muted-foreground ml-auto font-mono">
                    {option.count}
                  </span>
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
      {fieldOptions.length > 0 ? (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button type="button" variant="outline" className="rounded-xl font-medium" />}
          >
            {fieldsLabel}
            {fields.length > 0 ? ` (${fields.length})` : ''}
            <ChevronDown aria-hidden="true" className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="max-h-64 min-w-52 overflow-y-auto">
            <DropdownMenuGroup>
              <DropdownMenuLabel>{fieldsLabel}</DropdownMenuLabel>
              {fieldOptions.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.value}
                  aria-label={option.value}
                  checked={fields.includes(option.value)}
                  onCheckedChange={(checked) =>
                    toggleValue(fields, setFields, option.value, checked)
                  }
                >
                  {option.value}
                  <span aria-hidden="true" className="text-muted-foreground ml-auto font-mono">
                    {option.count}
                  </span>
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
      {applicationTypes.map((applicationType) => (
        <input key={applicationType} type="hidden" name="applicationType" value={applicationType} />
      ))}
      {fields.map((field) => (
        <input key={field} type="hidden" name="field" value={field} />
      ))}
    </>
  )
}
