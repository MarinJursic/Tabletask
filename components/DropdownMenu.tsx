"use client";

import { Menu, MenuItem } from "@mui/material";

interface DropdownMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  options: { label: string; onClick: () => void }[];
}

const DropdownMenu = ({ anchorEl, onClose, options }: DropdownMenuProps) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      className="mt-2"
      MenuListProps={{ className: "rounded-lg shadow-lg bg-white" }}
    >
      {options.map((option, index) => (
        <MenuItem
          key={index}
          onClick={() => {
            option.onClick();
            onClose();
          }}
          className="text-gray-700 hover:bg-gray-100 px-4 py-2"
        >
          {option.label}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default DropdownMenu;
