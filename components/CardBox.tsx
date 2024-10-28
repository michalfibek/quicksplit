import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type CardBoxProps = {
  title?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
};

export function CardBox({
  title,
  description,
  footer,
  children,
}: CardBoxProps) {
  return (
    <Card>
      <CardHeader>
        {title && (
          <CardTitle className="text-2xl font-bold leading-7 text-gray-900 dark:text-gray-50 sm:truncate sm:text-3xl sm:tracking-tight">
            {title}
          </CardTitle>
        )}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
