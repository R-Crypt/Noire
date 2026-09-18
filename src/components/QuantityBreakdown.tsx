import { Minus, Plus } from 'lucide-react';

interface QuantityBreakdownProps {
  sizes: string[];
  quantities: Record<string, number>;
  onChange: (size: string, qty: number) => void;
  moq: number;
  totalQuantity: number;
}

export function QuantityBreakdown({ sizes, quantities, onChange, moq, totalQuantity }: QuantityBreakdownProps) {
  const belowMoq = totalQuantity < moq;

  const handleChange = (size: string, delta: number) => {
    const current = quantities[size] ?? 0;
    const next = Math.max(0, current + delta);
    onChange(size, next);
  };

  return (
    <div>
      {/* MOQ header */}
      <div className="flex items-center justify-between mb-4">
        <p className="label-sm text-[#A8A4A0]">WHOLESALE ORDER</p>
        <p className="label-sm text-[#A8A4A0]">
          MINIMUM ORDER: <span className="text-[#141412]">{moq} UNITS</span>
        </p>
      </div>

      {/* Size rows */}
      <div className="border border-[#E2DDD8]">
        {sizes.map((size, i) => {
          const qty = quantities[size] ?? 0;
          return (
            <div
              key={size}
              className={`flex items-center justify-between px-4 py-3 ${
                i < sizes.length - 1 ? 'border-b border-[#E2DDD8]' : ''
              }`}
            >
              <span className="font-body text-[0.78rem] text-[#141412] tracking-wide w-16">{size}</span>

              <div className="flex items-center gap-0">
                <button
                  onClick={() => handleChange(size, -1)}
                  disabled={qty === 0}
                  className="w-10 h-10 flex items-center justify-center text-[#141412] disabled:text-[#C8C2BC] hover:bg-[#EEEAE4] transition-colors"
                  aria-label={`Decrease ${size}`}
                >
                  <Minus size={12} strokeWidth={1.5} />
                </button>
                <span
                  className="w-10 text-center font-body text-[0.82rem] text-[#141412] font-medium"
                  aria-live="polite"
                  aria-label={`${size}: ${qty} units`}
                >
                  {qty}
                </span>
                <button
                  onClick={() => handleChange(size, 1)}
                  className="w-10 h-10 flex items-center justify-center text-[#141412] hover:bg-[#EEEAE4] transition-colors"
                  aria-label={`Increase ${size}`}
                >
                  <Plus size={12} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          );
        })}

        {/* Total row */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#141412]">
          <span className="label-sm text-[#A8A4A0]">TOTAL</span>
          <span className="font-body text-[0.9rem] font-medium text-white tracking-wide">
            {totalQuantity} UNITS
          </span>
        </div>
      </div>

      {/* MOQ status */}
      <div className="mt-3 min-h-[20px]">
        {belowMoq && totalQuantity > 0 && (
          <p className="font-body text-[0.68rem] text-[#A8A4A0] tracking-wide">
            {moq - totalQuantity} more {moq - totalQuantity === 1 ? 'unit' : 'units'} needed to meet the minimum order.
          </p>
        )}
        {!belowMoq && totalQuantity > 0 && (
          <p className="font-body text-[0.68rem] text-[#4a7c59] tracking-wide">
            Minimum order met. {totalQuantity > moq && `(+${totalQuantity - moq} above MOQ)`}
          </p>
        )}
      </div>
    </div>
  );
}
